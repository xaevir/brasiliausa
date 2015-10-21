import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles.home + ' container'}>
        <div className="header">
          <img src={require('./home-page-banner.png')} />
        </div>
          <div className="row clearfix">
            <div className="col-md-4">
              <h2>Espresso Machines</h2>
              <img src={require('./home-page-espresso.jpg')} className="img-responsive" />
              <p>
                We stock a vast line of traditional and automatic Brasilia espresso machines,
                with models ranging from simple and dependable to elegant, art decorative,
                and technologically advanced. Regardless of your needs, we have a Brasilia espresso
                machine
                that will both meet and exceed your expectations. Whether you are a national
                account, a distributor, an independent coffee bar, restaurant, or simply a home
                user, our commitment to your espresso program remains unsurpassed.
              </p>
            </div>
            <div className="col-md-4">
              <h2>Zumex<br />Juicers</h2>
              <img src={require('./juicer.png')} className="img-responsive" />
              <p>
                Interested in adding some healthy items to your menu offering? How about freshly squeezed juices!? Ask us about our new line of Zumex citrus and multi-fruit juicers! We now stock equipment, parts, and offer service on all Zumex products. Based in Valencia, Spain, Zumex is the leading manufacturer of citrus juicers and innovators of the world’s first juicers with ASP antibacterial technology.
              </p>
            </div>
            <div className="col-md-4">
              <h2>World Class Support</h2>
              <img src={require('./home-page-service.jpg')} className="img-responsive" />
              <p>
                The technical department at Brasilia USA® takes pride in providing the highest level of service and support to its customers. All of our factory trained technicians have completed rigorous training courses in both the US and Italy, and attend annual seminars at our factory outside Milan to keep up with the latest trends and technology in espresso equipment service, specifically Brasilia® espresso machines.
              </p>
            </div>
          </div>
      </div>
    );
  }
}
