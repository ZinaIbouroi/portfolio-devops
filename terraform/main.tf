# ──────────────────────────────────────────────────────
# Author  : Ibouroi Zina Habiba
# GitHub  : github.com/ZinaIbouroi
# Project : Portfolio DevOps — Infrastructure as Code
# Stack   : Terraform · AWS S3 · CloudFront · Lambda · CloudWatch · SNS
# Date    : 2026
# ──────────────────────────────────────────────────────

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ── S3 Bucket ──
resource "aws_s3_bucket" "portfolio" {
  bucket = var.bucket_name

  tags = {
    Name        = var.bucket_name
    Environment = var.environment
  }
}

resource "aws_s3_bucket_public_access_block" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id
  versioning_configuration {
    status = "Enabled"
  }
}

# ── CloudFront Origin Access Control ──
resource "aws_cloudfront_origin_access_control" "portfolio" {
  name                              = "portfolio-zina-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# ── CloudFront Function pour le routing Next.js ──
resource "aws_cloudfront_function" "router" {
  name    = "portfolio-router"
  runtime = "cloudfront-js-1.0"
  code    = <<EOF
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }
  return request;
}
EOF
}

# ── CloudFront Distribution ──
resource "aws_cloudfront_distribution" "portfolio" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"
  comment             = "Portfolio Zina Ibouroi"

  origin {
    domain_name              = aws_s3_bucket.portfolio.bucket_regional_domain_name
    origin_id                = "S3-${var.bucket_name}"
    origin_access_control_id = aws_cloudfront_origin_access_control.portfolio.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${var.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.router.arn
    }

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  depends_on = [aws_s3_bucket_public_access_block.portfolio]
}

# ── S3 Bucket Policy ──
resource "aws_s3_bucket_policy" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontAccess"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.portfolio.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.portfolio.arn
          }
        }
      }
    ]
  })
}

# ── SNS Topic pour alertes ──
resource "aws_sns_topic" "alertes" {
  name = "portfolio-alertes"
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.alertes.arn
  protocol  = "email"
  endpoint  = "zinaibouroi.devops@outlook.fr"
}

# ── Alerte erreurs 5xx ──
resource "aws_cloudwatch_metric_alarm" "erreurs_5xx" {
  alarm_name          = "portfolio-erreurs-5xx"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "5xxErrorRate"
  namespace           = "AWS/CloudFront"
  period              = "300"
  statistic           = "Average"
  threshold           = "5"
  alarm_description   = "Alerte si taux erreurs 5xx depasse 5%"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alertes.arn]

  dimensions = {
    DistributionId = aws_cloudfront_distribution.portfolio.id
    Region         = "Global"
  }
}

# ── Alerte erreurs 4xx ──
resource "aws_cloudwatch_metric_alarm" "erreurs_4xx" {
  alarm_name          = "portfolio-erreurs-4xx"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "4xxErrorRate"
  namespace           = "AWS/CloudFront"
  period              = "300"
  statistic           = "Average"
  threshold           = "10"
  alarm_description   = "Alerte si taux erreurs 4xx depasse 10%"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alertes.arn]

  dimensions = {
    DistributionId = aws_cloudfront_distribution.portfolio.id
    Region         = "Global"
  }
}

# ── Surveillance nombre de requetes ──
resource "aws_cloudwatch_metric_alarm" "requetes" {
  alarm_name          = "portfolio-pic-trafic"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "Requests"
  namespace           = "AWS/CloudFront"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1000"
  alarm_description   = "Alerte si plus de 1000 requetes en 5 minutes"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alertes.arn]

  dimensions = {
    DistributionId = aws_cloudfront_distribution.portfolio.id
    Region         = "Global"
  }
}

# ── Surveillance bande passante ──
resource "aws_cloudwatch_metric_alarm" "bande_passante" {
  alarm_name          = "portfolio-bande-passante"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "BytesDownloaded"
  namespace           = "AWS/CloudFront"
  period              = "300"
  statistic           = "Sum"
  threshold           = "104857600"
  alarm_description   = "Alerte si telechargement depasse 100MB en 5 minutes"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alertes.arn]

  dimensions = {
    DistributionId = aws_cloudfront_distribution.portfolio.id
    Region         = "Global"
  }
}

# ── Surveillance taux de cache ──
resource "aws_cloudwatch_metric_alarm" "cache_hit_rate" {
  alarm_name          = "portfolio-cache-faible"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CacheHitRate"
  namespace           = "AWS/CloudFront"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "Alerte si taux de cache descend sous 80%"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alertes.arn]

  dimensions = {
    DistributionId = aws_cloudfront_distribution.portfolio.id
    Region         = "Global"
  }
}

# ── IAM Role pour Lambda ──
resource "aws_iam_role" "lambda_role" {
  name = "portfolio-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "lambda_cloudwatch" {
  name = "portfolio-lambda-cloudwatch-policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "cloudwatch:GetMetricData",
          "cloudwatch:GetMetricStatistics",
          "cloudwatch:ListMetrics",
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "*"
      }
    ]
  })
}

# ── Lambda Function ──
resource "aws_lambda_function" "monitoring" {
  filename         = "lambda/monitoring.zip"
  function_name    = "portfolio-monitoring"
  role             = aws_iam_role.lambda_role.arn
  handler          = "monitoring.handler"
  runtime          = "nodejs20.x"
  timeout          = 30
  source_code_hash = filebase64sha256("lambda/monitoring.zip")

  environment {
    variables = {
      DISTRIBUTION_ID = aws_cloudfront_distribution.portfolio.id
    }
  }
}

# ── API Gateway ──
resource "aws_apigatewayv2_api" "monitoring" {
  name          = "portfolio-monitoring-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET"]
    allow_headers = ["Content-Type"]
  }
}

resource "aws_apigatewayv2_integration" "monitoring" {
  api_id             = aws_apigatewayv2_api.monitoring.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.monitoring.invoke_arn
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "monitoring" {
  api_id    = aws_apigatewayv2_api.monitoring.id
  route_key = "GET /metrics"
  target    = "integrations/${aws_apigatewayv2_integration.monitoring.id}"
}

resource "aws_apigatewayv2_stage" "monitoring" {
  api_id      = aws_apigatewayv2_api.monitoring.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.monitoring.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.monitoring.execution_arn}/*/*"
}