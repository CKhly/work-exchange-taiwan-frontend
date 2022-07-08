import moment from 'moment';

const formatDate = (value) => {
  return moment(value).format('YYYY/MM/DD')
}
const formatTime = (value) => {
  return moment(value).format('YYYY/MM/DD HH:MM')
}

module.exports = {
  formatDate,
  formatTime
}