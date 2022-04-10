import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import isBetween from "dayjs/plugin/isBetween";

export const useMyHook = (args: any) => {
  const { locale, selectedDateStart, selectedDateEnd } = args;
  dayjs.extend(localeData);
  dayjs.extend(isBetween);
  if (locale) {
    require(`dayjs/locale/${locale}`);
    dayjs.locale(locale);
  }
  dayjs().localeData();

  const now = dayjs();
  const daysArray: Date[] = [];
  const firstDayOfMonthWeekDay = now.date(1).day();
  Array.from(Array(firstDayOfMonthWeekDay).keys()).map((i) => {
    daysArray.push(now.date(i + 1 - firstDayOfMonthWeekDay).toDate());
  });
  const daysInMonthCount = now.daysInMonth();
  console.log(daysArray.length);
  let restOfTheDaysCount = daysInMonthCount;
  if ((daysArray.length + daysInMonthCount) % 7 === 0) {
    restOfTheDaysCount = restOfTheDaysCount + 7;
  }
  Array.from(Array(restOfTheDaysCount).keys()).forEach((i) => {
    daysArray.push(now.date(i + 1).toDate());
  });

  // split array in 7 slices
  console.log(daysArray.length);
  const arr2 = daysArray.reduce((acc: any, cur, i) => {
    if (i % 7 === 0) {
      let tempArr: any[] = [];
      acc.push(tempArr);
    }
    const dayInfo = {
      date: cur,
      isToday: dayjs(cur).isSame(dayjs(), "day"),
      isThisMonth: dayjs(cur).isSame(dayjs(), "month"),
      isPreviousMonth: dayjs(cur).isBefore(dayjs(), "month"),
      isNextMonth: dayjs(cur).isAfter(dayjs(), "month"),
      isPreviousYear: dayjs(cur).isBefore(dayjs(), "year"),
      isNextYear: dayjs(cur).isAfter(dayjs(), "year"),
      weekDayNameShort: dayjs(cur).format("ddd"),
      weekDayNameLong: dayjs(cur).format("dddd"),
      weekDayNumber: dayjs(cur).day(),
      monthNameShort: dayjs(cur).format("MMM"),
      monthNameLong: dayjs(cur).format("MMMM"),
      monthNumber: dayjs(cur).month(),
      isSelected: dayjs(cur).isBetween(selectedDateStart, selectedDateEnd),
    };

    acc[acc.length - 1].push(dayInfo);
    return acc;
  }, []);

  return arr2;
};
