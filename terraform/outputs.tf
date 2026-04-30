output "cloudfront_url" {
  description = "URL de ton portfolio"
  value       = "https://${aws_cloudfront_distribution.portfolio.domain_name}"
}

output "s3_bucket_name" {
  description = "Nom du bucket S3"
  value       = aws_s3_bucket.portfolio.id
}

output "cloudfront_distribution_id" {
  description = "ID CloudFront pour le pipeline CI/CD"
  value       = aws_cloudfront_distribution.portfolio.id
}