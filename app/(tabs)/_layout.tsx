import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#3c3c3c',
        },
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="filmes/listaFilmes"
        options={{
          title: 'Filmes',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'videocam' : 'videocam-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bebidas/listaBebidas"
        options={{
          title: 'Bebidas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'beer' : 'beer-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bebidas/cadastraBebidas"
        options={{
          title: 'Cadastra Bebidas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
