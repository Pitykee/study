import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [uzenet, setUzenet] = useState(null);   // { szoveg, tipus }

  function notify(szoveg, tipus = 'success') {
    setUzenet({ szoveg, tipus });
  }

  // 3 másodperc után eltűnik az értesítés
  useEffect(() => {
    if (!uzenet) return;
    const t = setTimeout(() => setUzenet(null), 3000);
    return () => clearTimeout(t);
  }, [uzenet]);   // JAVÍTÁS 2: minden új üzenetnél induljon az időzítő

  return (
    <NotificationContext.Provider value={{ notify }}>
      {uzenet && (
        <div className={`alert alert-${uzenet.tipus} position-fixed bottom-0 end-0 m-3 shadow`} style={{ zIndex: 1000 }}>
          {uzenet.szoveg}
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification csak NotificationProvider-en belül használható!');
  return ctx;
}
