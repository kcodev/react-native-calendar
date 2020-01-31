import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment/min/moment-with-locales';
import { months } from 'moment';

export default function CalendarHeader(props) {
  const {
    selected,
    month,
    previousMonth,
    nextMonth,
    weekDays,
    dateFormat,
    locale,
    style
  } = props;

  return (
    <View>
      <View style={[styles.containerHeaderStyle, style.containerHeaderStyle]}>
        <TouchableOpacity onPress={previousMonth} style={[styles.buttonsHeaderStyle, style.buttonsHeaderStyle]}>
          <MaterialIcons name="keyboard-arrow-left" size={24} />
        </TouchableOpacity>
        <View style={[styles.containerDateHeaderStyle, style.containerDateHeaderStyle]}>
          <Text style={[styles.dateHeaderStyle, style.dateHeaderStyle]}>
            {capitalize(moment(month).locale(locale).format(dateFormat))}
          </Text>
        </View>
        <TouchableOpacity onPress={nextMonth} style={[styles.buttonsHeaderStyle, style.buttonsHeaderStyle]}>
          <MaterialIcons name="keyboard-arrow-right" size={24} />
        </TouchableOpacity>
      </View>
      <View style={[styles.containerDaysHeaderStyle, style.containerDaysHeaderStyle]}>
        {weekDays.map(day => (
          <View key={day} style={[styles.containerDayHeaderStyle, style.containerDayHeaderStyle]}>
            <Text style={[styles.dayHeaderStyle, style.dayHeaderStyle]}>
              {day}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

CalendarHeader.propTypes = {
  selected: PropTypes.any.isRequired,
  month: PropTypes.any.isRequired,
  previousMonth: PropTypes.any.isRequired,
  nextMonth: PropTypes.any.isRequired,

  dateFormat: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,

  weekDays: PropTypes.any.isRequired,

  style: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  containerHeaderStyle: {
    flexDirection: 'row'
  },
  buttonsHeaderStyle: {
    padding: 8,
    margin: 8
  },
  containerDateHeaderStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateHeaderStyle: {
    // fontFamily: font,
    fontSize: 24
  },
  containerDaysHeaderStyle: {
    flexDirection: 'row'
  },
  containerDayHeaderStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8
  },
  dayHeaderStyle: {
    // fontFamily: font,
    fontSize: 16,
    color: '#0D3579'
  }
});

function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/(^|\s)\S/g, l => l.toUpperCase());
}
