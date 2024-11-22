import {View, Text, SafeAreaView} from 'react-native';
import React, { useState } from 'react';
import Calender from './src/Screens/Calender/Calender';
import Dropdown from './src/Screens/Dropdown/Dropdown';

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const dropdownOptions = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Option 4' },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Calender /> */}

      <Dropdown 
          options={dropdownOptions}
          onSelect={handleSelectOption}
          placeholder="Select an option"
      />
    </SafeAreaView>
  );
};

export default App;
