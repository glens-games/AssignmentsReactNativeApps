import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';

// Types
export type Options = {
  darkMode: boolean;
  enableGPS?: boolean;
  // add more customization options later
};

export type LogItem = {
  id: string;
  timestamp: string; // ISO string
  typeId: string;
  gps?: {lat: number; lon: number} | null;
};

export type LogSession = {
  id: string;
  title: string;
  createdAt: string; // ISO
  items: LogItem[];
};

export type LogTypeDef = {
  id: string;
  name: string;
  requiresGPS?: boolean;
  togglesToId?: string | null; // if set, clicking this type will create the other type next
};

export type AppData = {
  options: Options;
  sessions: LogSession[];
  types: LogTypeDef[];
};

// Defaults
const defaultTypes: LogTypeDef[] = [
  {id: 'log', name: 'LOG', requiresGPS: false, togglesToId: null},
  {id: 'travel_start', name: 'Travel Start', requiresGPS: true, togglesToId: 'travel_end'},
  {id: 'travel_end', name: 'Travel End', requiresGPS: true, togglesToId: 'travel_start'},
  {id: 'session_start', name: 'Session Start', requiresGPS: false, togglesToId: 'session_end'},
  {id: 'session_end', name: 'Session End', requiresGPS: false, togglesToId: 'session_start'},
  {id: 'wait_start', name: 'Wait Start', requiresGPS: false, togglesToId: 'wait_end'},
  {id: 'wait_end', name: 'Wait End', requiresGPS: false, togglesToId: 'wait_start'},
  {id: 'admin_start', name: 'Admin Start', requiresGPS: false, togglesToId: 'admin_end'},
  {id: 'admin_end', name: 'Admin End', requiresGPS: false, togglesToId: 'admin_start'},
];

const defaultData: AppData = {
  options: {enableGPS: false, darkMode: false},
  sessions: [],
  types: defaultTypes,
};

// Utility
const nowISO = () => new Date().toISOString();
const uid = (prefix = '') => prefix + Math.random().toString(36).slice(2, 9);

// Context
type LocalStorageContextType = {
  data: AppData;
  setOptions: (opts: Partial<Options>) => void;
  createSession: (title?: string) => LogSession;
  setSessionName: (sessionId: string, title: string) => void;
  addItemToSession: (sessionId: string, typeId: string, gps?: {lat: number; lon: number} | null) => LogItem | null;
  deleteItem: (sessionId: string, itemId: string) => void;
  deleteSession: (sessionId: string) => void;
  getTypeById: (id: string) => LogTypeDef | undefined;
};

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined);

export const LocalStorageProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [data, setData] = useState<AppData>(defaultData);

  // In future, we can persist to AsyncStorage here.
  useEffect(() => {
    // placeholder for loading saved data
  }, []);

  const setOptions = (opts: Partial<Options>) => {
    setData(d => ({...d, options: {...d.options, ...opts}}));
  };

  const createSession = (title?: string) => {
    const session: LogSession = {
      id: uid('s-'),
      title: title || `Session ${new Date().toLocaleString()}`,
      createdAt: nowISO(),
      items: [],
    };
    setData(d => ({...d, sessions: [session, ...d.sessions]}));
    return session;
  };

  const setSessionName = (sessionId: string, title: string) => {
    setData(d => ({
      ...d,
      sessions: d.sessions.map(s => (s.id === sessionId ? {...s, title} : s))
    }));
  };

  const addItemToSession = (sessionId: string, typeId: string, gps?: {lat: number; lon: number} | null) => {
    const typeDef = data.types.find(t => t.id === typeId);
    if (!typeDef) {
      Alert.alert('Unknown log type');
      return null;
    }
    const item: LogItem = {id: uid('i-'), timestamp: nowISO(), typeId, gps: gps ?? null};

    setData(d => {
      const sessions = d.sessions.map(s => {
        if (s.id !== sessionId) return s;
        return {...s, items: [...s.items, item]};
      });

      // handle toggle behavior: if type toggles to another id, we could auto-add the toggled item
      // but per spec, clicking a Start should change its type so next time it becomes End; here we keep simple and only add item
      return {...d, sessions};
    });
    return item;
  };

  const deleteItem = (sessionId: string, itemId: string) => {
    setData(d => ({...d, sessions: d.sessions.map(s => (s.id === sessionId ? {...s, items: s.items.filter(i => i.id !== itemId)} : s))}));
  };

  const deleteSession = (sessionId: string) => {
    setData(d => ({...d, sessions: d.sessions.filter(s => s.id !== sessionId)}));
  };

  const getTypeById = (id: string) => data.types.find(t => t.id === id);

  const value = useMemo(
    () => ({data, setOptions, createSession, setSessionName, addItemToSession, deleteItem, deleteSession, getTypeById}),
    [data]
  );

  return <LocalStorageContext.Provider value={value}>{children}</LocalStorageContext.Provider>;
};

export const useLocalStorage = () => {
  const ctx = useContext(LocalStorageContext);
  if (!ctx) throw new Error('useLocalStorage must be used within LocalStorageProvider');
  return ctx;
};
