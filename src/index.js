import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarWeek from './CalendarWeeks';
import CalendarHeader from './CalendarHeader';

export default function Calendar(props) {
  const {
    weekDaysLabels,
    locale,
    dateFormat,
    minDate,
    events,
    staticCalendar,
    onPressDay,
    eventsView,

    // Header
    headerStyle,

    // Day
    dayStyle
  } = props;

  const [month, setMonth] = useState(moment());
  const [selected, setSelected] = useState(moment().startOf('day'));

  const previousMonth = () => {
    const date = month.clone();
    date.subtract(1, 'month');

    setMonth(date);
    // setSelected(date);
  };

  const nextMonth = () => {
    const date = month.clone();
    date.add(1, 'month');

    setMonth(date);
    // setSelected(date);
  };

  const select = (day, evts) => {
    if (!staticCalendar) {
      setMonth(day.date.clone());
      setSelected(day.date);
      onPressDay(day.date, evts);
    }
  };

  const renderWeeks = () => {
    const weeks = [];
    let done = false;
    const date = month.clone().startOf('month').add('w' - 1).day('Sunday');
    let count = 0;
    let monthIndex = date.month();

    while (!done) {
      weeks.push(
        <CalendarWeek
          key={date}
          date={date.clone()}
          month={month}
          select={(day, evts) => select(day, evts)}
          selected={selected}
          dayStyle={dayStyle}
          minDate={minDate}
          events={events}
          eventsView={eventsView}
          staticCalendar={staticCalendar}
        />
      );

      date.add(1, 'w');
      done = (count += 1) > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  };

  return (
    <View style={styles.containerCalendarStyle}>
      <CalendarHeader
        selected={selected}
        month={month}
        previousMonth={previousMonth}
        nextMonth={nextMonth}
        weekDays={weekDaysLabels}
        dateFormat={dateFormat}
        locale={locale}
        style={headerStyle}
      />
      {renderWeeks()}
    </View>
  );
}

Calendar.defaultProps = {
  dateFormat: 'MMMM DD[,] YYYY',
  locale: 'es',
  minDate: null,
  events: {},
  staticCalendar: false,
  onPressDay: () => { },
  eventsView: null,

  // Header
  headerStyle: {
    containerHeaderStyle: {},
    buttonsHeaderStyle: {},
    containerDateHeaderStyle: {},
    dateHeaderStyle: {},
    containerDaysHeaderStyle: {},
    containerDayHeaderStyle: {},
    dayHeaderStyle: {}
  },

  // Day
  dayStyle: {
    containerStyle: {},
    containerDayStyle: {},
    containerTodayDayStyle: {},
    containerSelectedDayStyle: {},
    dayStyle: {},
    selectedDayStyle: {}
  },

  weekDaysLabels: [
    'Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'
  ]
};

Calendar.propTypes = {
  dateFormat: PropTypes.string,
  locale: PropTypes.string,
  minDate: PropTypes.any,
  events: PropTypes.object,
  staticCalendar: PropTypes.bool,
  weekDaysLabels: PropTypes.arrayOf(PropTypes.string),
  onPressDay: PropTypes.func,

  eventsView: PropTypes.any,

  // Header
  headerStyle: PropTypes.shape({
    containerHeaderStyle: PropTypes.object,
    buttonsHeaderStyle: PropTypes.object,
    containerDateHeaderStyle: PropTypes.object,
    dateHeaderStyle: PropTypes.object,
    containerDaysHeaderStyle: PropTypes.object,
    containerDayHeaderStyle: PropTypes.object,
    dayHeaderStyle: PropTypes.object
  }),

  // Day
  dayStyle: PropTypes.shape({
    containerStyle: PropTypes.object,
    containerDayStyle: PropTypes.object,
    containerTodayDayStyle: PropTypes.object,
    containerSelectedDayStyle: PropTypes.object,
    dayStyle: PropTypes.object,
    selectedDayStyle: PropTypes.object,
    disableDay: PropTypes.object
  })
};

const styles = StyleSheet.create({
  containerCalendarStyle: {
    marginHorizontal: 16
  }
});
