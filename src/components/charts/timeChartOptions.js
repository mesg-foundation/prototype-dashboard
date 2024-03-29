const tooltipFormatter = {
  day: date => [
    `0${date.getDate()}`.slice(-2),
    `0${date.getMonth() + 1}`.slice(-2),
    date.getFullYear()
  ].join('/'),
  hour: date => [
    `0${date.getDate()}`.slice(-2),
    `0${date.getMonth() + 1}`.slice(-2),
    date.getFullYear()
  ].join('/') + ' ' + [
      `0${date.getHours()}`.slice(-2),
      `0${date.getMinutes()}`.slice(-2)
    ].join(':')
}

export default interval => ({
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    intersect: false,
    backgroundColor: 'white',
    titleFontColor: 'rgba(0,0,0,0.87)',
    bodyFontColor: 'rgba(0,0,0,0.87)',
    footerFontColor: 'rgba(0,0,0,0.87)',
    borderColor: 'rgba(0,0,0,0.24)',
    cornerRadius: 0,
    caretSize: 10,
    borderWidth: 1,
    callbacks: {
      title: tooltipItems => tooltipItems
        .map(x => tooltipFormatter[interval](x.xLabel))
    }
  },
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 1,
      borderWidth: 0,
      backgroundColor: '#1976d2'
    },
    line: {
      backgroundColor: '#e3f2fd',
      pointRadius: 0,
      borderColor: '#1976d2',
      borderWidth: 2
    }
  },
  scales: {
    xAxes: [{
      type: 'time',
      time: {
        unit: this.interval
      }
    }],
    yAxes: [{
      ticks: {
        maxTicksLimit: 5
      },
      gridLines: {
        display: true
      }
    }]
  }
})
