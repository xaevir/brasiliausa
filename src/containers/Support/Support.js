import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

export default class Support extends Component {

  render() {
    const inventoryImage = require('./inventory.jpg');
    const jeffVanImage = require('./jeff-van.jpg');
    const servicingImage = require('./servicing.jpg');
    const jeffyPartsImage = require('./jeffy-parts.jpg');
    return (
      <div className="container">
        <DocumentMeta title="BrasiliaUSA: Support"/>
        <div className="header">
          <h1 className="title">
            Service and Support
          </h1>
        </div>
        <div className="main-content">
          <section>
            <h2>Parts and Inventory</h2>
            <p>
              <img alt="inventory" src={inventoryImage}/>
              Brasilia USA<i className="tm">&reg;</i> currently maintains the largest inventory of spare parts
              for all makes and models of espresso machines. The large inventory allows
              Brasilia<i className="tm">&reg;</i> to fill orders in an efficient and timely manner. Parts can be shipped
              throughout North America from economical ground methods to express overnight
              delivery. Since inventory arrives by both ocean and air freight from Europe,
              out of stock parts will be available with short back order time. Brasilia USA<i className="tm">&reg;</i>
              also has the largest stock of Brasilia<i className="tm">&reg;</i> espresso machines, and Rossi grinders
              in North America. In addition, we are constantly expanding and upgrading our inventory
              with new options and technology developed by all companies within Gruppo Rossi.
            </p>
          </section>
          <section>
            <h2>Service</h2>
            <p>
              <img alt="jeff parts" src={jeffyPartsImage} />
              The technical department at Brasilia USA<i className="tm">&reg;</i> takes pride in providing the highest
              level of service and support to its customers. All of our factory trained technicians
              have completed rigorous training courses in both the US and Italy, and attend annual
              seminars at our factory outside Milan to keep up with the latest trends and technology
              in espresso equipment service. In addition to supporting Brasilia<i className="tm">&reg;</i> machines, our service
              department operates independently to provide service on all makes and models manufactured
              by competitors. Our large parts inventory ensures that our service department is equipped
              with all the necessary tools to properly repair any espresso machine.The technical department
              at Brasilia USA<i className="tm">&reg;</i> takes pride in providing the highest level of service and support to its
              customers. All of our factory trained technicians have completed rigorous training courses
              in both the US and Italy, and attend annual seminars at our factory outside Milan to keep
              up with the latest trends and technology in espresso equipment service. In addition to
              supporting Brasilia<i className="tm">&reg;</i> machines, our service department operates independently to provide
              service on all makes and models manufactured by competitors. Our large parts inventory ensures
              that our service department is equipped with all the necessary tools to properly repair
              any espresso machine.
            </p>
            <p>
              The technical department at Brasilia USA<i className="tm">&reg;</i> takes pride in providing the highest level of
              service and support to its customers. All of our factory trained technicians have completed
              rigorous training courses in both the US and Italy, and attend annual seminars at our factory
              outside Milan to keep up with the latest trends and technology in espresso equipment service.
              In addition to supporting Brasilia<i className="tm">&reg;</i> machines, our service department operates independently to
              provide service on all makes and models manufactured by competitors. Our large parts inventory
              ensures that our service department is equipped with all the necessary tools to properly repair
              any espresso machine.
            </p>
            <p>
              Brasilia USA<i className="tm">&reg;</i> also offers a list of lucrative service programs to prevent costly repairs,
              and ensure optimal equipment performance. They are as follows:
            </p>
          </section>
          <section>
            <h2>Preventative Maintenance Service (PM)</h2>
            <p>
              <img alt="jeff van" src={jeffVanImage} />
              Will significantly increase the life of the machine, help avert expensive repairs down
              the line, as well as improve the quality and taste of the coffee. A technician will come
              to the customer location and replace the group head showers, gaskets, and anti suction valve,
              as well as recalibrate pump and static pressures, and “tune up” the rest of the machine.
              Replacing the group head showers radically enhances the taste of the coffee, as residue
              from the oils and caramels of coffee builds up on the screen. Replacing the gaskets makes
              certain that the portafilter and group head form the correct seal to enable the proper 9+ bars of
              pressure to build up for a perfect espresso extraction. Changing the anti-siphon valve is very
              important as its responsibility is preventing milk from being sucked back into the boiler. In
              addition to the services listed, the technician will leave the customer with a report on the
              machines’ performance, as well as make recommendations and suggestions to ensure the unit
              continues to operate without flaw.
            </p>
          </section>
          <section>
            <h2>Pro-Active Maintenance Contracts</h2>
            <p>
              <img alt="servicing" src={servicingImage}/>
              We offer maintenance contracts for all machines to allow our customers to budget for
              service expenses on an annual basis, as well as provide peace of mind that the machine will
              be properly cared for. The standard maintenance contract includes PM services to be conducted
              at 6 month intervals, and covers all repairs to include both parts and labor for the period of
              one year. In addition, we will customize maintenance agreements for customers in search of a
              more aggressive approach to both performance, and regularly scheduled service.
            </p>
          </section>
          <section>
            <h2>Asset Management Services</h2>
            <p>
              Water treatment is vital to the performance of any piece of equipment that utilizes a boiler
              to heat water. Some say that a water softener is the “lifeline” of an espresso machine as its
              function is to prevent scale and lime from building up inside the unit. Hard water can destroy
              a brand new espresso machine in just a few months if measures are not taken to prevent this
              chemical reaction from occurring. In addition to equipment protection, proper water filtration
              ensures quality in the taste of the coffee.
            </p>
            <p>
              Brasilia USA<i className="tm">&reg;</i> keeps a water softener database to track the life and performance of the water
              systems for its customers at no charge! Once your unit is installed, we test the water quality
              on location and utilize a detailed formula (provided by our water treatment specialists) to
              calculate the life of the softener cartridges. When the time comes, a Brasilia<i className="tm">&reg;</i> technician will
              call or send an email (depending on customer preference) to let the customer know that it is
              time to change the softener cartridges. Once we get customer authorization, we will ship the
              cartridges with instructions, or offer them at a discounted price with the purchase of a PM Service.
              This is just another value added service that Brasilia USA<i className="tm">&reg;</i> is happy to offer its customers.
            </p>
            <p>
              Please contact us for information on service rates, policies, or any of our service programs.
              On behalf of the Brasilia USA<i className="tm">&reg;</i> service department, we look forward to serving you!
            </p>
          </section>
        </div>
      </div>
    );
  }
}
