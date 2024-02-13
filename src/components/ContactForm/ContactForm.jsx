import { useState } from 'react';
import s from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setName(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ name, phone });
    reset();
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form} autoComplete="on">
      <input
        className={s.input}
        type="text"
        name="name"
        required
        placeholder="Enter Name"
        value={name}
        onChange={handleChange}
      />
      <input
        className={s.input}
        type="text"
        name="phone"
        required
        placeholder="Enter Phone"
        value={phone}
        onChange={handleChange}
      />
      <button className={s.btn}>Add contact</button>
    </form>
  );
};

export default ContactForm;
