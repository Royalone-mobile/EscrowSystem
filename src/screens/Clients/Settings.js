import React, { Component } from 'react'

import { Image, View, TouchableOpacity } from 'react-native'

import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Form,
  Input,
  Item,
  Label,
  CheckBox,
  Col,
  Row,
  Grid
} from 'native-base'


class Settings extends Component {
  render() {
    return (
      <Container>
        <Content padder={true} style={{paddingTop: 30}}>
          <Grid>
            <Col style={{maxWidth: 80, flexBasis: 80, marginRight: 20}}> 
              <TouchableOpacity>
                <Text style={{transform: [{rotate: '-90deg'}], marginBottom: 30, marginTop: 30}}>Account</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{transform: [{rotate: '-90deg'}], marginBottom: 30, marginTop: 30}}>Billing</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{transform: [{rotate: '-90deg'}], marginBottom: 30, marginTop: 30}}>Help</Text>
              </TouchableOpacity>
            </Col>
            <Col>
              <Form>
                <Item stackedLabel>
                  <Label>Full Name</Label>
                  <Input/>
                </Item>
                <Item stackedLabel>
                  <Label>Email</Label>
                  <Input/>
                </Item>
                <Item stackedLabel>
                  <Label>New Password</Label> 
                  <Input secureTextEntry={true}/>
                </Item>
                <Item stackedLabel>
                  <Label>Available For Work?</Label>
                  <CheckBox checked={true} />
                </Item>
              </Form>
              <Button><Text>Save</Text></Button>
            </Col>
          </Grid>
        </Content>
      </Container>
    )
  }
}

export default Settings;