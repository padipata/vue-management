import Vue from 'vue'

Vue.filter('toDate', function (val) {
  let times = new Date(val).getTime()
  if (times == null) {
    return ''
  }
  let d = new Date(times)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate()
  let realMonth = month >= 10 ? month : "0" + month
  let realDay = day >= 10 ? day : "0" + day

  let str = year + "-" + realMonth + "-" + realDay + " "

  return str
})

Vue.filter('toDateTime', function (val) {
  let times = new Date(val).getTime()
  if (times == null) {
    return ''
  }
  let d = new Date(times)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate()
  let realMonth = month >= 10 ? month : "0" + month
  let realDay = day >= 10 ? day : "0" + day
  let hour = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours()
  let minute = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes()
  let second = d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds()
  let str = year + "-" + realMonth + "-" + realDay + " " + hour + ":" + minute + ":" + second

  return str
})
