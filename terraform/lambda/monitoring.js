const { CloudWatchClient, GetMetricDataCommand } = require('@aws-sdk/client-cloudwatch')

const cloudwatch = new CloudWatchClient({ region: 'us-east-1' })

exports.handler = async (event) => {
  const distributionId = process.env.DISTRIBUTION_ID

  const endTime = new Date()
  const startTime = new Date(endTime.getTime() - 60 * 60 * 1000)

  const params = {
    MetricDataQueries: [
      {
        Id: 'requests',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/CloudFront',
            MetricName: 'Requests',
            Dimensions: [
              { Name: 'DistributionId', Value: distributionId },
              { Name: 'Region', Value: 'Global' }
            ]
          },
          Period: 3600,
          Stat: 'Sum'
        }
      },
      {
        Id: 'errors5xx',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/CloudFront',
            MetricName: '5xxErrorRate',
            Dimensions: [
              { Name: 'DistributionId', Value: distributionId },
              { Name: 'Region', Value: 'Global' }
            ]
          },
          Period: 3600,
          Stat: 'Average'
        }
      },
      {
        Id: 'errors4xx',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/CloudFront',
            MetricName: '4xxErrorRate',
            Dimensions: [
              { Name: 'DistributionId', Value: distributionId },
              { Name: 'Region', Value: 'Global' }
            ]
          },
          Period: 3600,
          Stat: 'Average'
        }
      },
      {
        Id: 'cacheHitRate',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/CloudFront',
            MetricName: 'CacheHitRate',
            Dimensions: [
              { Name: 'DistributionId', Value: distributionId },
              { Name: 'Region', Value: 'Global' }
            ]
          },
          Period: 3600,
          Stat: 'Average'
        }
      },
      {
        Id: 'bytes',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/CloudFront',
            MetricName: 'BytesDownloaded',
            Dimensions: [
              { Name: 'DistributionId', Value: distributionId },
              { Name: 'Region', Value: 'Global' }
            ]
          },
          Period: 3600,
          Stat: 'Sum'
        }
      }
    ],
    StartTime: startTime,
    EndTime: endTime
  }

  try {
    const command = new GetMetricDataCommand(params)
    const data = await cloudwatch.send(command)

    const result = {}
    data.MetricDataResults.forEach(metric => {
      result[metric.Id] = {
        value: metric.Values[0] || 0,
        timestamp: metric.Timestamps[0] || null
      }
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result)
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    }
  }
}