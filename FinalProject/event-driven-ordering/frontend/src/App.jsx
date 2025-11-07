import React, {useState} from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function App(){
  const [lastId, setLastId] = useState('');
  const [timeline, setTimeline] = useState([]);

  async function createOrder(){
    const res = await axios.post(`${API}/orders`, { items:[{sku:'SKU1',qty:1}], customer:{name:'Alice',email:'alice@example.com'}, total:100 });
    alert('Created ' + res.data.orderId);
    setLastId(res.data.orderId);
  }

  async function fetchOrder(){
    if(!lastId) return alert('set lastId from creation or paste an id');
    const res = await axios.get(`${API}/orders/${lastId}`);
    setTimeline(res.data.history || []);
  }

  return (<div style={{padding:20}}>
    <h1>Event Driven Orders — Demo UI</h1>
    <button onClick={createOrder}>Create order</button>
    <div style={{marginTop:10}}>
      <input placeholder="order id" value={lastId} onChange={e=>setLastId(e.target.value)} style={{width:400}} />
      <button onClick={fetchOrder} style={{marginLeft:8}}>Fetch timeline</button>
    </div>
    <h3>Timeline</h3>
    <ul>
      {timeline.map(t=> <li key={t.eventId}>{t.eventType} @ {t.occurredAt}</li>)}
    </ul>
  </div>);
}
