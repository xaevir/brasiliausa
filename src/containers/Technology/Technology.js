import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

export default class Technology extends Component {

  render() {
    return (
      <div className="container">
        <DocumentMeta title="BrasiliaUSA: Technology"/>
        <div className="header">
          <h1 className="title">Espresso Machine Technology</h1>
        </div>
        <div className="main-content">
          <section>
            <img src={require('./technology-header.jpg')}/>
            <p>
              Innovation and creativity have always been among BRASILIA's top
              priorities. Our dedication to technological advancement has led to the
              discovery of new ways to brew a perfect Espresso and has enabled the
              R&D department to achieve revolutionary goals. Two of our most
              important technological accomplishments in the last 10 years include
              the development of both the Bullone Rosso and Sublima patented brewing
              systems. These two brewing technologies focus on temperature consistency
              and optimal espresso extraction.
            </p>
            <p>
              In 2003, the Bullone Rosso system was introduced to the market to
              improve thermal stability in the temperature of the coffee while
              simultaneously enhancing both pre-infusion and espresso extraction.
              As a result we were able to ensure steady temperature with minimum
              variation and a maximum fluctuation in the brewing group of .5 degrees
              Celsius regardless of steam or hot water consumption.  The Bullone Rosso
              system also led to a superior extraction with a 30% increase in the
              concentration of coffee flavors (measured in BRIX) versus the other
              professional machines on the market at that time.
            </p>
            <p>
              In 2009, we introduced the Sublima system, a revolutionary brewing
              system that grants the utmost in temperature stability and espresso
              extraction. The Sublima system has an independent boiler for each group
              head as well as a digital PID control to precisely set and monitor the
              temperature of the water. As a result, the barista may program the
              exact temperature of each boiler to optimally extract the espresso based
              on the parameters of the coffee blend as intended by the roaster.
              In addition, the extraction occurs at 14 bars via a patented hydraulic
              circuit resulting in a record concentration of 10.4 BRIX with a standard
              7 gram espresso dose. The Sublima also delivers frothed milk 30% faster
              than any machine on the market as the main boiler is dedicated solely to
              steam and hot water production!
            </p>
          </section>
          <section>
            <h2>Being market innovators to us means:</h2>
            <ul className="orange-bullet">
              <li>To anticipate market trends and provide clever and innovative solutions.</li>
              <li>
                To focus on Research and Development to create new technologies and
                products for all market applications while working in cooperation
                with the most important regulatory bodies for proper certifications.
              </li>
              <li>
                Being Espresso Pioneers: the innovators in the coffee
                business; those that created and work to continuously improve the
                modern Espresso coffee machine concept. BRASILIA<i className="tm">&reg;</i> and Gruppo Rossi are
                the sole owners of over 70 patented systems.
              </li>
              <li>
                Attention to Detail Throughout the Production Process: Market
                Research and Extensive Testing, both in the laboratory and in the
                field to ensure the highest quality products.
              </li>
            </ul>
          </section>
          <section>
            <h2>Bullone Rosso</h2>
            <p><img src={require('./bullone.jpg')}/>Bullone Rosso - patented brewing system which grants thermal stability
              and superior coffee extraction.
            </p>
            <ul className="orange-bullet">
              <li>
                Perfect Espresso: thanks to a superb pre-infusion injector the
                Bullone Rosso system is able to extract a 30% higher concentration of
                espresso flavors and aromas.
              </li>
              <li>
                Thermal Stability: a temperature regulator maintains continuous
                thermal-stability at the brewing group with minimum variations of .5
                degrees Celsius to ensure optimal espresso extraction regardless of
                working conditions.
              </li>
            </ul>
          </section>
          <section>
            <h2>Sublima: The New Frontier in Brewing Technology</h2>
            <p>
              <img src={require('./sublima-550.jpg')}/>
              This patented Espresso brewing system delivers almost a 50% better
              extraction, and froths milk nearly 30% faster than any other traditional
              machine on the market.  According to the IPSOS Research Institute in
              Rome in an article published on October 29, 2008 in Comunicaffe, the
              Sublima system "Is the favorite coffee machine of Italian Baristas: Opus
              Sublima beats the competitors with a top quality crema"
            </p>
            <ul className="orange-bullet">
              <li>
                <b>Quality:</b> Sublima is the only brewing system in the market to
                extract coffee at a record concentration of 10.4°Brix with a standard
                7 gram Espresso dose.
              </li>
              <li>
                <b>Excellence:</b> While traditional brewing pressure can hardly
                exceed 9 bars without over-extracting coffee, the innovative
                pump-driven <b>PrussurePlus</b> brewing cycle can boost maximum
                pressure up to 14 bars to create the optimal extraction profile of a
                traditional lever machine.
              </li>
              <li>
                <b>Forefront Technology:</b> Enhanced infusion using the HYDROACTIVE
                S-2 infusion system: a special device which combines state-of-the-art
                electronics together with an innovative hydraulic architecture.
                Circuit-Managing solenoid valves grant exceptional timing and accuracy
                in the pre-infusion process, juicing the coffee grounds to release a
                higher concentration of caramels, oils, and aromas during the
                extraction process.
              </li>
              <li>
                <b>Flexibility:</b> The TEMPDRIVE Temperature Balancing System
                ensures thermal stability and optimal coffee extraction. Each brewing
                group is equipped with an independent coffee boiler that allows the
                barista to digitally set the temperature according to the coffee blend.
                As a result, the main steam boiler is exclusively dedicated to hot
                water and steam production to deliver frothed milk 30% faster than the
                competitors in the market.
              </li>
              <li>
                <b>Intelligence:</b> it’s easy to communicate with SUBLIMA. Thanks
                to its DOUBLE DISPLAY USER INTERFACE, a set of easy to read LCD
                screens, it is possible to control and monitor all the “vital”
                parameters of the machine: main boiler temperature, group boiler
                temperature, and all group functions.
              </li>
            </ul>
          </section>
        </div>
      </div>
    );
  }
}
