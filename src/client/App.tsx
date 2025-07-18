import { Cursors } from './components/cursors/Cursors';
import { GuestbookForm } from './components/GuestbookForm';

export default function App() {

  return (
    <>
      <h1>Hello!</h1>
      <Cursors />
      <p class='little-message-popup'>Press <kbd>/</kbd> to say something whimsical.</p>
      <GuestbookForm />
    </>
  )
}
