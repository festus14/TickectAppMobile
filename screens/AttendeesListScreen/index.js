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
import TopBar from '../../components/TopBar';
import {ERROR_MESSAGE, TIMEOUT_MESSAGE} from '../../utility/constants';
import {getBaseUrl, showToast} from '../../utility/helpers';
import {styles} from './style';

const AttendeesListScreen = ({navigation}) => {
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [position, setPosition] = useState('left');
  const [guests, setGuests] = useState('guests/in/');

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
        showToast(ERROR_MESSAGE);
      }
    } catch (e) {
      setIsLoading(false);
      showToast(ERROR_MESSAGE);
      console.log('Error in fetching attendees', e);
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, [guests]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Attendees" />

      <TopBar
        style={styles.topBar}
        tabBtn={styles.tabBtn}
        leftText="Present"
        rightText="All"
        position={position}
        setLeftPosition={setPositionHandler}
        setRightPosition={setPositionHandler}
      />

      <View style={{paddingBottom: 150}}>
        <FlatList
          data={attendees}
          renderItem={({item}) => <AttendeesItem item={item} />}
          keyExtractor={item => item.slug}
          refreshControl={
            <RefreshControl onRefresh={fetchAttendees} refreshing={isLoading} />
          }
          ListEmptyComponent={
            <Text style={{textAlign: 'center', fontSize: 15, marginTop: 10}}>
              Pull down to refresh
            </Text>
          }
          ListFooterComponent={<View style={{marginBottom: 25}} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default AttendeesListScreen;
