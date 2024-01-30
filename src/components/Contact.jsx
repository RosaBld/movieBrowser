import { useState } from 'react';
import DOMPurify from 'dompurify';

export function Contact() {
    
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [mail, setMail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleMessageSubmit = (event) => {
        event.preventDefault();

        const name = DOMPurify.sanitize(event.target.name.value);
        const lname = DOMPurify.sanitize(event.target.lname.value);
        const mail = DOMPurify.sanitize(event.target.mail.value);
        const message = DOMPurify.sanitize(event.target.message.value);
    
        // Validate the input...
        if (!name) {
            setErrorMessage('Name is invalid!')
            return;
        }
        if (!lname) {
            setErrorMessage('Last Name is invalid!')
            return;
        }
        if (!validateEmail(mail)) {
            setErrorMessage('Mail Adress is invalid!')
            return;
        }
        if (!message) {
            setErrorMessage('Message invalid! Please write something!')
            return;
        }
    }

    return (
        <div className="contactUs">
            <h2 className="contact">Need something?</h2>
            <div className="contactForm">
                <form className="formContact" onSubmit={handleMessageSubmit}>
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                    
                    <label htmlFor="name">First Name:
                        <input type="text" id="name" value={name} onChange={event => setName(event.target.value)} />
                    </label>
                    
                    <label htmlFor="lname">Last Name:
                        <input type="text" id="lname" value={lname} onChange={event => setLname(event.target.value)} />
                    </label>

                    <label htmlFor="mail">Mail Adress:
                        <input type="text" id="mail" value={mail} onChange={event => setMail(event.target.value)} />
                    </label>

                    <label htmlFor="message">Your Message:
                        <textarea id="message" value={message} onChange={event => setMessage(event.target.value)} />
                    </label>

                        <input className="submitMessage" type="submit" value="Send my message!" />
                </form>
            </div>
        </div>
    )
}