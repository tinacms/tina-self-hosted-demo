import { GetServerSidePropsContext } from "next";
import { Redis } from "@upstash/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../tina/nextauth";
import React from "react";
import { useRouter } from "next/router";

const {
  NEXTAUTH_CREDENTIALS_KEY = "tinacms_users",
  KV_REST_API_URL: url,
  KV_REST_API_TOKEN: token,
} = process.env

const redis = new Redis({ url, token })

export default function UserPage(props: { users }) {
  const router = useRouter();
  const handleAddUser = async (event) => {
    event.preventDefault()
    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ op: 'add', user }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (res.status === 200) {
      setStatus('idle')
    } else {
      setStatus('error')
    }
    await router.replace(router.asPath)
  }

  const handleDeleteUser = async (event) => {
    event.preventDefault()
    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ op: 'delete', user }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (res.status === 200) {
      setStatus('idle')
    } else {
      setStatus('error')
    }
    await router.replace(router.asPath)
  }

  const handleEditUser = async (event) => {
    event.preventDefault()
    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ op: 'save', user }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (res.status === 200) {
      setStatus('idle')
    } else {
      setStatus('error')
    }
    await router.replace(router.asPath)
  }

  const handleUsernameUpdated = (event) => {
    setUser({
      username: event.target.value,
      role: user.role,
    })
  }
  const handleRoleUpdated = (event) => {
    setUser({
      username: user.username,
      role: event.target.value,
    })
  }

  const [user, setUser] = React.useState({ username: '', role: 'editor' })
  const [status, setStatus] = React.useState<'idle' | 'add' | 'delete' | 'edit' | 'error'>('idle')
  if (status === 'add' || status === 'edit') {
    return (
      <div>
        <h1>Add User</h1>
        <div>
          <label>
            Username:
            <div style={{border: '1px solid black', padding: '1px', margin: '1px'}}>
              <input type="text" name="username" onChange={handleUsernameUpdated} value={user.username}/>
            </div>
          </label>
          <label>
            Role
            <div style={{border: '1px solid black', padding: '1px', margin: '1px'}}>
              <select name="role" onChange={handleRoleUpdated} value={user.role}>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
          </label>
          <button onClick={(e) => status === 'add' ? handleAddUser(e) : handleEditUser(e)}>Save</button>
        </div>
      </div>
    )
  } else if (status === 'delete') {
    return (
      <div>
        <h1>Delete User?</h1>
        <div>
         <button onClick={() => setStatus('idle')}>Cancel</button>
          <button onClick={(e) => handleDeleteUser(e) }>Delete</button>
        </div>
      </div>
    )
  } else if (status === 'error') {
    return (
      <div>
        <h1>Error</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {props.users?.map((user) => (
          <li key={user.username}>
            {user.username} | ({user.role}) | <button onClick={(e) => { setUser(user); setStatus('delete') }}>Delete</button> <button onClick={(e) => { setUser(user); setStatus('edit') }}>Edit</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => { setUser({ username: '', role: 'editor' }); setStatus('add')}}>Add User</button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext)  {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session?.user) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    }
  }

  const users = []
  if ((session?.user as any).role === 'admin') {
    const authCollection = await redis.json.get(NEXTAUTH_CREDENTIALS_KEY)
    if (authCollection) {
      const usernames = Object.keys(authCollection)
      for (const username of usernames) {
        const user = authCollection[username]
        users.push(user)
      }
    }
  }
  return { props: {
    users
  }}
}
