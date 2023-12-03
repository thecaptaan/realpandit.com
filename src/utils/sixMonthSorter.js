module.exports = function findLastSixMonthData(data) {
    const monthCounts = {};
    for (let i = 6; i >= 1; i--) {
      const targetMonth = moment().subtract(i, "months").format("MMMM");
      monthCounts[targetMonth] = 0;
    }
    data.forEach((item) => {
      const createdAtMoment = moment(item.createdAt);
  
      if (
        createdAtMoment.isAfter(moment().subtract(6, "months")) &&
        createdAtMoment.isBefore(moment().startOf("month"))
      ) {
        const monthName = createdAtMoment.format("MMMM");
        monthCounts[monthName] = 0;
        monthCounts[monthName]++;
      }
    });
    return monthCounts;
  }