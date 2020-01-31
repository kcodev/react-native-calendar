import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');
const daySize = (width - 16) / 7;

export default function CalendarEvents(props) {
  const { events } = props;

  return (
    <View style={styles.containerEventStyle}>
      {
        events.map(event => (
          <View key={event.id} style={[styles.eventStyle, { backgroundColor: event.color }]} />
        ))
      }
    </View>
  );
}

CalendarEvents.propTypes = {
  events: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  containerEventStyle: {
    position: 'absolute',
    height: daySize,
    width: daySize,
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventStyle: {
    height: daySize * 0.8,
    width: daySize * 0.8,
    borderRadius: daySize,
    position: 'absolute'
  }
});
