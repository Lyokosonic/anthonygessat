import React, { Component } from "react";
import { Fade, Slide } from "react-reveal";
import Swal from 'sweetalert2'

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: ""
    }
  }
  
  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const zip = this.props.data.address.zip;
    const phone = this.props.data.phone;
    const message = this.props.data.contactmessage;

    const onSubmit = async (event) => {
      event.preventDefault();
      this.setState({result: "Sending...."});
      const formData = new FormData(event.target);
  
      formData.append("access_key", '480fcd1f-50a5-430f-b98a-c9ebe3a90028');
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        this.setState({result: "Form Submitted Successfully"});
        Swal.fire({
          title: "Success!",
          text: "Message envoyé avec succès!",
          icon: "success"
        });
        event.target.reset();
      } else {
        console.log("Error", data);
        this.setState({result: data.message});
      }
    };

    return (
      <section id="contact">
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="two columns header-col">
              <h1>
                <span>Get In Touch.</span>
              </h1>
            </div>

            <div className="ten columns">
              <p className="lead">{message}</p>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>
            <div className="eight columns">
              <form onSubmit={onSubmit} action="" method="post" id="contactForm" name="contactForm">
                <fieldset>
                  <div>
                    <label htmlFor="contactName">
                      Nom <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactName"
                      name="contactName"
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactEmail"
                      name="contactEmail"
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contactSubject">
                      Objet <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactSubject"
                      name="contactSubject"
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contactMessage">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      cols="50"
                      rows="15"
                      id="contactMessage"
                      name="contactMessage"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <button className="submit">Envoyer</button>
                  </div>
                  <span>{this.state.result}</span>
                </fieldset>
              </form>
            </div>
          </Slide>

          <Slide right duration={1000}>
            <aside className="four columns footer-widgets">
              <div className="widget widget_contact">
                <h4>Address and Phone</h4>
                <p className="address">
                  {name}
                  <br />
                  {street} <br />
                  {zip}, {city} {state} 
                  <br />
                  <span>{phone}</span>
                </p>
              </div>
            </aside>
          </Slide>
        </div>
      </section>
    );
  }
}

export default Contact;
