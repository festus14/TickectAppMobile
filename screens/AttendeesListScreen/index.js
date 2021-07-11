import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Text} from 'react-native';
import AttendeesItem from '../../components/AttendeesItem';
import Header from '../../components/Header';
import {ERROR_MESSAGE, TIMEOUT_MESSAGE} from '../../utility/constants';
import {showToast} from '../../utility/helpers';

const AttendeesListScreen = ({navigation}) => {
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAttendees = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://143.244.148.38/api/guests/in/1');

      setTimeout(() => {
        setIsLoading(false);
        if (!res) showToast(TIMEOUT_MESSAGE, 'long');
      }, 15000);

      setIsLoading(false);
      if (res.status === 200 || res.status === 201) {
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
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Attendees" />

      <FlatList
        data={attendees}
        renderItem={({item}) => <AttendeesItem item={item} />}
        keyExtractor={item => item.slug}
        onRefresh={() => fetchAttendees}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
};

export default AttendeesListScreen;
