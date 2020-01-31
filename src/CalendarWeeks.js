import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import CalendarDay from './CalendarDay';

export default function CalendarWeek(props) {
  const {
    date,
    month,
    selected,
    select,
    dayStyle,
    minDate,
    events,
    eventsView,
    staticCalendar
  } = props;

  const localDate = date.clone();
  const days = [];

  for (let i = 0; i < 7; i++) {
    const day = {
      name: localDate.format('dd').substring(0, 1),
      number: localDate.date(),
      isCurrentMonth: localDate.month() === month.month(),
      isToday: localDate.isSame(new Date(), 'day'),
      date: localDate.clone()
    };

    days.push(
      <CalendarDay
        key={day.date}
        day={day}
        selected={selected}
        select={select}
        style={dayStyle}
        minDate={minDate}
        events={events[day.date.format('YYYY-MM-DD')] || []}
        eventsView={eventsView}
        staticCalendar={staticCalendar}
      />
    );

    localDate.add(1, 'day');
  }

  return (
    <View style={styles.constainerWeekStyle}>
      {days}
    </View>
  );
}

CalendarWeek.defaultProps = {
  minDate: null,
  eventsView: null
};

CalendarWeek.propTypes = {
  date: PropTypes.any.isRequired,
  month: PropTypes.any.isRequired,
  selected: PropTypes.any.isRequired,
  select: PropTypes.any.isRequired,
  dayStyle: PropTypes.object.isRequired,
  minDate: PropTypes.any,
  events: PropTypes.object.isRequired,
  eventsView: PropTypes.any,
  staticCalendar: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  constainerWeekStyle: {
    flexDirection: 'row'
  }
});
