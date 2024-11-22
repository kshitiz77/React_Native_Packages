import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import colors from '../../styles/colors';
import {moderateScaleVertical} from '../../styles/responsiveSize';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startOfMonth = currentMonth.clone().startOf('month');
  const endOfMonth = currentMonth.clone().endOf('month');
  const daysInMonth = currentMonth.daysInMonth();

  // Create an array for days of the current month, including previous month's trailing days and next month's leading days
  const calendarDays = [];

  // Add previous month's trailing days
  for (let i = startOfMonth.weekday(); i > 0; i--) {
    calendarDays.push(moment(startOfMonth).subtract(i, 'days'));
  }

  // Add the current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(moment(currentMonth).date(i));
  }

  // Add next month's leading days
  for (let i = 1; calendarDays.length < 42; i++) {
    calendarDays.push(moment(endOfMonth).add(i, 'days'));
  }

  const renderItem = ({item}) => {
    console.log(currentMonth.format('MMM'), item.format('MMM'), 'renderItem');
    return (
      <TouchableOpacity
        disabled={
          currentMonth.format('MMM') === item.format('MMM') ? false : true
        }
        style={styles.dayCell}>
        <Text
          style={[
            styles.dayText,
            currentMonth.format('MMM') === item.format('MMM')
              ? {color: '#333'}
              : {color: colors.veryLightGrey},
          ]}>
          {item.date()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              setCurrentMonth(currentMonth.clone().subtract(1, 'month'))
            }>
            <Text style={styles.navText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {currentMonth.format('MMMM YYYY')}
          </Text>
          <TouchableOpacity
            onPress={() =>
              setCurrentMonth(currentMonth.clone().add(1, 'month'))
            }>
            <Text style={styles.navText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: moderateScaleVertical(10),
          }}>
          {days.map((ele, ind) => {
            return <Text style={{...styles.daysText}}>{ele}</Text>;
          })}
        </View>
        <FlatList
          data={calendarDays}
          renderItem={renderItem}
          numColumns={7}
          keyExtractor={(item, index) => index.toString()}
          style={styles.grid}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  navText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  daysText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 0.14,
    textAlign: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'column',
  },
  dayCell: {
    flex: 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(10),
  },
  dayText: {
    fontSize: 16,
  },
});

export default Calendar;
