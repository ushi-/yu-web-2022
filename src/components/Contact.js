import React from 'react'
import { Button, Box, Form, FormField, Layer, TextArea } from 'grommet'
import { Heading1, Heading3 } from './Theme'
// import CircularProgress from '@material-ui/core/CircularProgress'

const regexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isSending: false, sent: false, showThanks: false }
  }

  handleChange = (e) => {
    if (e.target) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  handleSubmit = (e) => {
    this.setState({ isSending: true })
    e.preventDefault()
    const form = e.target
    const { name, email, message } = this.state
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        name,
        email,
        message,
      }),
    })
      .then(() => {
        this.setState({ isSending: false, sent: true, showThanks: true })
      })
      .catch((error) => {
        this.setState({ isSending: false })
        alert(error)
      })
  }

  render() {
    const { isSending, sent, showThanks } = this.state
    return (
      <React.Fragment>
        <Form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          name="contact"
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <div hidden>
            <label>
              Don’t fill this out:{' '}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </div>
          <FormField name="name" label="Name" required />
          <FormField
            name="email"
            label="Email"
            required
            validate={{
              regexp: regexp,
              message: 'Email not valid',
            }}
          />
          <FormField name="message" label="Message" required as={TextArea} />
          <Button
            type="submit"
            primary
            label={
              isSending ? (
                <Box pad="3px">
                  {/* <CircularProgress size={14} color="inherit" /> */}
                </Box>
              ) : sent ? (
                'Sent'
              ) : (
                'Send'
              )
            }
            margin={{ vertical: 'medium' }}
            disabled={isSending || sent}
          />
        </Form>
        {showThanks && (
          <Layer
            onEsc={() => this.setState({ showThanks: false })}
            onClickOutside={() => this.setState({ showThanks: false })}
            responsive={false}
          >
            <Box
              pad="medium"
              round="small"
              overflow="hidden"
              background="white"
            >
              <Heading1>Thanks.</Heading1>
              <Heading3>
                I'll probably respond within a day or two. If it's urgent, shout
                at me on Twitter.
              </Heading3>
              <Button
                alignSelf="start"
                primary
                label="OK"
                margin={{ vertical: 'medium' }}
                onClick={() => this.setState({ showThanks: false })}
              />
            </Box>
          </Layer>
        )}
      </React.Fragment>
      // <form
      //   name="contact"
      //   method="post"
      //   action="/thanks/"
      //   data-netlify="true"
      //   data-netlify-honeypot="bot-field"
      //   onSubmit={this.handleSubmit}
      // >
      // {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
      // <input type="hidden" name="form-name" value="contact" />
      // <div hidden>
      //   <label>
      //     Don’t fill this out:{' '}
      //     <input name="bot-field" onChange={this.handleChange} />
      //   </label>
      // </div>
      //   <div className="field">
      //     <label className="label" htmlFor={'name'}>
      //       Your name
      //     </label>
      //     <div className="control">
      //       <input
      //         className="input"
      //         type={'text'}
      //         name={'name'}
      //         onChange={this.handleChange}
      //         id={'name'}
      //         required={true}
      //       />
      //     </div>
      //   </div>
      //   <div className="field">
      //     <label className="label" htmlFor={'email'}>
      //       Email
      //     </label>
      //     <div className="control">
      //       <input
      //         className="input"
      //         type={'email'}
      //         name={'email'}
      //         onChange={this.handleChange}
      //         id={'email'}
      //         required={true}
      //       />
      //     </div>
      //   </div>
      //   <div className="field">
      //     <label className="label" htmlFor={'message'}>
      //       Message
      //     </label>
      //     <div className="control">
      //       <textarea
      //         className="textarea"
      //         name={'message'}
      //         onChange={this.handleChange}
      //         id={'message'}
      //         required={true}
      //       />
      //     </div>
      //   </div>
      //   <div className="field">
      //     <button className="button is-link" type="submit">
      //       Send
      //     </button>
      //   </div>
      // </form>
    )
  }
}
