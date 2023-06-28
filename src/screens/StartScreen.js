import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import UserTracker from '../components/ImageComponent/UserTracker'

export default function StartScreen({ route, navigation }) {

const userTracker = route.params && route.params.lastState ? <UserTracker displayCoordinates={false}/> : null
    
    return (
      <Background>
       {userTracker}
        <Logo />
        <Header>risk.control.unit</Header>
        <Paragraph>
          The easiest way to track and report the investigation.
        </Paragraph>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('LoginScreen')}
        >
          Sign-in
        </Button>
      </Background>
    )
  }