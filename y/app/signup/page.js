"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import AuthorizationLayout from '@/components/AuthorizationLayout'
import image from "@/public/earth.jpg"
import { Form, Button, Container, Row, Col, Form } from 'react-bootstrap'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function showForm() {
    return (
      <Form 
        onSubmit={handleSubmit} style={{padding:'15%', justifyContent:'center'}}
      >
      <h2 style={{textAlign:'center'}}>Signup for PeFi</h2>
      <Form.Group>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Your email address'
          name='email'
          onChange={e => setEmail(e.target.value)}
          value={email}
          required
        />
        <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Your password'
          name='password'
          onChange={e => setPassword(e.target.value)}
          value={password}
          required
        />
        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='password2'>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Confirm password'
          name='confirmPassword'
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
        />
        <Form.Control.Feedback type='invalid'>Confirm your password!</Form.Control.Feedback>
      </Form.Group>
    )
  }

  return (
    <AuthorizationLayout 
      title="Signup for PeFi" 
      image={image}
      alt="earth"
      children={showForm()}
      imageTitle="Create your login"
      imageDescription="We&apos;ll need your email address, and a unique password. You&apos;ll use this to login to access Personal Finance next time."
    /> 
  )
}