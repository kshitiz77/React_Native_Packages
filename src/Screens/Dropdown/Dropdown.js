import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import images from '../../constants/images';
import {moderateScale, moderateScaleVertical} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
// import Icon from 'react-native-vector-icons/Ionicons';  // Only if you're using icons

const Dropdown = ({options, onSelect, placeholder}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSelect = option => {
    setSelectedOption(option);
    onSelect(option); // Callback to pass selected option back to parent
    setIsModalVisible(false); // Close modal after selection
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
        <Text style={styles.selectedText}>
          {selectedOption ? selectedOption : placeholder}
        </Text>
        <Image source={images.arrowDown} style={styles.icon} />
      </TouchableOpacity>
      {isModalVisible &&
      <TouchableWithoutFeedback  onPress={() => setIsModalVisible(false)}>
        <View   style={{borderWidth:moderateScale(1),width:'100%',zIndex:999, backgroundColor:colors.white, top:moderateScaleVertical(50), position:'absolute'}} >
          {
            options?.map((ele, ind) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(ele.name)}>
                  <Text style={styles.itemText}>{ele.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </TouchableWithoutFeedback>
}
      <Text>
        Kshitiz
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height:moderateScaleVertical(50),
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default Dropdown;
