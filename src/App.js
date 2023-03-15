import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase-init';
import { useState } from 'react';


const auth = getAuth(app);
function App() {
  const [register, setRegister] = useState(false);
  const [error, setError] = useState('')
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }
  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }
  const handleRegisterChange = event => {
    setRegister(event.target.checked)
  }
  const handleFormSubmit = event => {

    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (!/.*[\W_]/.test(password)) {
      setError('Password Should contain at least one special character')
      return;
    }
    setError('')
    setValidated(true);

    if (register) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error);
          setError(error.message)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
          setEmail('')
          setPassword('')
          verifyEmail();
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        });
    }
    event.preventDefault();
  }
  // verifyEmail
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email sent hoica')
      })
  }
  // handlePasswordRest
  const handlePasswordRest = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('password Reset');
      })
  }
  return (
    <div>
      <div className="registration w-50 mx-auto mt-5">
        <h2 className='text-primary'>Please {register ? 'Login' : "Register"}!!!</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisterChange} type="checkbox" label="Already Register" />
          </Form.Group>
          <Button onClick={handlePasswordRest} variant="link">Forget Password</Button>
          <p className='text-danger'>{error}</p>
          <Button variant="primary" type="submit">
            {register ? 'Login' : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
