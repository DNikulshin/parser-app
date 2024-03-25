import axios from "axios"
import { SetStateAction, useCallback, useState } from "react"

function App() {
  const [value, setValue] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  const changeHandler = (event: { target: { value: SetStateAction<string> } }) => {
    if (event.target.value)
      setValue(event.target.value)

  }

  const clickHandler = useCallback(async (type: string) => {
    if (value) {
      try {
        setLoading(true)
        const data = await axios.post(`http://localhost:7777/api/resume/${type}`, {
          value,
          email,
          type
        })
        console.log(data);
        
        setItems(data?.data ?? [])
        setLoading(false)
      } catch (e) {
        setIsAuth(false)
        setLoading(false)
        console.log(e);

      }
    }

  }, [value])

  const clickAuth = useCallback(async () => {
    if (email && password) {
      try {
        const data = await axios.post('http://localhost:7777/api/resume/auth', {
          email,
          password
        })
        console.log(data);
        

      } catch (e) {
        setIsAuth(false)
        console.log(e);

      }

    }


  }, [email, password])

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
      <h1>HH.ru</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <input type="text" placeholder="Введите email..." style={{ padding: '.5rem' }}
          onChange={(e) => {
            if (e.target.value) {
              setEmail(e.target.value)
            }
          }}
        />

        <input type="password" placeholder="Введите пароль.." style={{ padding: '.5rem' }}
          onChange={(e) => {
            if (e.target.value) {
              setPassword(e.target.value)
            }
          }}
        />
        <button style={{ background: "brown", color: 'white' }}
          onClick={clickAuth}
        >Авторизация
        </button>
      </div>
      <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: "center",
        alignItems: 'center',
        gap: '1rem'
      }}>
        <input type="text" placeholder="Введите значение..." style={{ padding: '.5rem' }}
          onChange={changeHandler}
        />
        <button style={{ background: "gray", color: 'white' }}
          onClick={() => clickHandler('hh')}
        >Найти
        </button>
      </div>
      {items.length > 0 && <div>Всего: {items.length}</div>}
      <div style={{ display: "flex", flexDirection: 'column', gap: '1rem', margin: '1rem', overflowY: 'scroll', width: '100%' }}>
        {(items && !loading) && items.map(item => {
          return <>
            <a href={item} target="_blank">{item}</a>
          </>
        })}
      </div>
      {/* <div>{isAuth ? 'Авторизован' : 'Не аворизован!'}</div> */}
      {loading && <h3>Загрузка...</h3>}
    </div>
  )
}

export default App
