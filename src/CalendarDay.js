import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import CalendarEvents from './CalendarEvents';

const { width } = Dimensions.get('window');
const daySize = (width - 16) / 7;

export default function CalendarDay(props) {
  const {
    day,
    select,
    selected,
    style,
    minDate,
    events,
    eventsView,
    staticCalendar
  } = props;
  const { date, isCurrentMonth, isToday, number } = day;

  const onPressDay = () => {
    if (minDate) {
      if (day.date > minDate) select(day, events);
    } else {
      select(day, events);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.containerStyle, style.containerStyle]}
      onPress={onPressDay}
    >
      <View style={[
        [styles.containerDayStyle, style.containerDayStyle],
        !staticCalendar && (isToday && [styles.containerTodayDayStyle, style.containerTodayDayStyle]),
        !staticCalendar && (date.isSame(selected) && [styles.containerSelectedDayStyle, style.containerSelectedDayStyle])
      ]}>
        {
          eventsView
            ? (eventsView(events))
            : (
              useMemo(() => (events.length > 0) && <CalendarEvents events={events} numbreDay={number} />, [events])
            )
        }
        <Text style={[
          [styles.dayStyle, style.dayStyle],
          isCurrentMonth && styles.isCurrentMonthStyle,
          !staticCalendar && (date.isSame(selected) && [styles.selectedDayStyle, style.selectedDayStyle]),
          minDate && ((day.date <= minDate) && [styles.disableDay, style.disableDay]),
          !eventsView && ((events.length > 0) && styles.selectedDayStyle)
        ]}>
          {number}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

CalendarDay.defaultProps = {
  minDate: null,
  eventsView: null
};

CalendarDay.propTypes = {
  day: PropTypes.any.isRequired,
  select: PropTypes.any.isRequired,
  selected: PropTypes.any.isRequired,
  style: PropTypes.object.isRequired,
  minDate: PropTypes.any,
  events: PropTypes.array.isRequired,
  eventsView: PropTypes.any,
  staticCalendar: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: daySize * 1.2,
  },
  isCurrentMonthStyle: {
    color: '#0D3579'
  },
  containerDayStyle: {
    height: daySize * 0.8,
    width: daySize * 0.8,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerSelectedDayStyle: {
    backgroundColor: '#2DD2F7',
    borderRadius: 32,
  },
  containerTodayDayStyle: {
    backgroundColor: '#DDF5FA',
  },
  dayStyle: {
    color: '#A9B9D1',
    // fontFamily: 'font',
    fontSize: 16
  },
  selectedDayStyle: {
    color: 'white'
  },
  disableDay: {
    color: '#DADADA'
  }
});
