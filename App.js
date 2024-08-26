import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://192.168.1.37:3000/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Lỗi: {error.message}</Text>
      </View>
    );
  }

  if (!students.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Không có dữ liệu học sinh</Text>
      </View>
    );
  }

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Danh Sách Học Sinh" />
      </Appbar.Header>
      <FlatList
        data={students}
        keyExtractor={(item) => item.m_id.toString()}
        renderItem={({ item }) => {
          // Determine gender text
          const genderText = item.m_gender === 'M' ? 'Nam' : 'Nữ';

          return (
            <Card containerStyle={{ borderRadius: 10 }}>
              <Card.Title>{item.m_name}</Card.Title>
              <Card.Divider />
              <Text>ID: {item.m_id}</Text>
              <Text>Giới tính: {genderText}</Text>
            </Card>
          );
        }}
      />
    </PaperProvider>
  );
};

export default App;