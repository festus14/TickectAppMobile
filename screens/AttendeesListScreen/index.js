import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import AttendeesItem from '../../components/AttendeesItem';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import TopBar from '../../components/TopBar';
import VirtualizedView from '../../components/VirtualizedView';
import {
  ERROR_MESSAGE,
  INVALID_URL,
  TIMEOUT_MESSAGE,
} from '../../utility/constants';
import {getBaseUrl, showToast} from '../../utility/helpers';
import {styles} from './style';

const AttendeesListScreen = ({navigation}) => {
  const [attendees, setAttendees] = useState([]);
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState('left');
  const [guests, setGuests] = useState('guests/in/');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const filtered = attendees.filter(elem => {
      if (
        (
          (elem?.name?.toLowerCase() ?? '') +
          (elem?.email?.toLowerCase() ?? '') +
          (elem?.phone?.toLowerCase() ?? '')
        ).includes(searchText.toLowerCase())
      )
        return elem;
    });

    if (!filtered.length && searchText.length) showToast('Not found', 'long');
    setFilteredAttendees(filtered);
  }, [searchText]);

  const setPositionHandler = async pos => {
    setPosition(pos);
    if (pos === 'left') setGuests('guests/in/');
    else setGuests('guests/');
  };

  useEffect(() => {
    setPositionHandler('left');
  }, []);

  const fetchAttendees = async () => {
    try {
      setIsLoading(true);
      const url = await getBaseUrl();
      const res = await fetch(`${url}${guests}1`);

      setTimeout(() => {
        setIsLoading(false);
        if (!res) showToast(TIMEOUT_MESSAGE, 'long');
      }, 15000);

      setIsLoading(false);
      if (res.status === 200 || res.status === 201) {
        showToast('Fetch successful', 'long');
        const resJson = await res.json();
        setAttendees(resJson.data);
      } else {
        Alert.alert('Error', ERROR_MESSAGE);
      }
    } catch (e) {
      setIsLoading(false);
      Alert.alert('Error', INVALID_URL);
      console.log('Error in fetching attendees', e);
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, [guests]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Attendees" />

      <View style={styles.head}>
        <TopBar
          style={styles.topBar}
          tabBtn={styles.tabBtn}
          leftText="Present"
          rightText="All"
          position={position}
          setLeftPosition={setPositionHandler}
          setRightPosition={setPositionHandler}
        />

        <InputText
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          titleStyle={styles.titleStyle}
          placeholder="Search Guests List"
          onChangeText={input => setSearchText(input)}
        />
      </View>

      <VirtualizedView
        refreshControl={
          <RefreshControl onRefresh={fetchAttendees} refreshing={isLoading} />
        }>
        <FlatList
          data={filteredAttendees.length ? filteredAttendees : attendees}
          renderItem={({item}) => <AttendeesItem item={item} />}
          keyExtractor={item => item.slug}
          contentContainerStyle={styles.scrollView}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', fontSize: 15, marginTop: 10}}>
              Pull down to refresh
            </Text>
          }
          ListFooterComponent={<View style={{marginBottom: 25}} />}
        />
      </VirtualizedView>
    </SafeAreaView>
  );
};

export default AttendeesListScreen;
