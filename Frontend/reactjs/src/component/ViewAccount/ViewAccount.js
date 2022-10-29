
import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import TopBar from '../LayoutBar/TopBar'

function ViewAccount() {
  const [profile, setProfile] =useState()

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getProfile = async () => {
      try {
        const response = await axiosPrivate.get('/profile/:username', {
          signal: controller.signal
        }
        )
        console.log(response)
        isMounted && setProfile(response)
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()

    return () => {
      isMounted = false;
      controller.abort()
    }
  },[])
  return (
    
    <article>
      <TopBar />
    <div>ViewAccount Page is here</div>
    {profile?.length
      ? (
        <ul>
          {profile.map((item, index) => 
          <li key={index}>
            {item}
          </li>)}
        </ul>
      ) : <p>no info</p>

    }
    </article>
  )
}

export default ViewAccount