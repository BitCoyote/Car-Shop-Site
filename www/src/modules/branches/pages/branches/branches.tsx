import { graphql, useStaticQuery } from 'gatsby'
import { Block, Card, Content, Loading, Warning, Yoga } from 'gerami'
import Markdown from 'markdown-to-jsx'
import React from 'react'

import { useBranchesQuery } from '../../../../../gen/apollo-types'
import { BranchesStaticQuery } from '../../../../../gen/gatsby-types'
import LayoutDefault from '../../../../shared/components/layout/layout'
import { nameDealerType } from '../../../../shared/components/nameDealerType'
import SEO from '../../../../shared/components/seo/seo'
import EmailContact from '../../components/contact/contact'
import './branches.scss'

type Branches = {}

const Branches: React.FC<Branches> = () => {
  const { data, loading, error } = useBranchesQuery()
  const { branchesHero } = useStaticQuery<BranchesStaticQuery>(query)

  return (
    <>
      <SEO
        title="Contacts"
        description={`Nyala Motors S.C. branches and contact informations`}
      />

      <LayoutDefault>
        <div
          className={'branches-hero-container'}
          style={{
            backgroundImage: `url(${branchesHero?.childImageSharp?.fluid?.src})`,
          }}
        >
          <Block className="center branches-hero-tag">
            <h1>Contact Us </h1>
          </Block>
        </div>
        <Content size={'3XL'} transparent={true}>
          {!data && loading ? (
            <div className="padding-very-big">
              <Loading className="margin-vertical-very-big" delay={700} />
            </div>
          ) : error ? (
            <div className="padding-very-big">
              <Warning problem={error as any} />
            </div>
          ) : (
            <>
              {data?.branches?.map((val, key) => (
                <Card className="margin-vertical-very-big" key={key}>
                  <Block>
                    <h3> {val!.name} </h3>
                    <Yoga maxCol={3}>
                      <div>
                        <h4 style={{ color: 'rgba(0,0,0, 0.7)' }}>
                          Dealer Type
                        </h4>
                        <div>
                          {val?.dealerTypes?.map((v, key) => (
                            <Markdown className={'markdown'} key={key}>
                              {nameDealerType(v?.dealerType!) || ''}
                            </Markdown>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 style={{ color: 'rgba(0,0,0, 0.7)' }}>Address</h4>
                        <Markdown className={'markdown'}>
                          {val!.physicalAddress}
                        </Markdown>
                      </div>
                      <div>
                        <h4 style={{ color: 'rgba(0,0,0, 0.7)' }}>
                          Working Hours
                        </h4>
                        <Markdown className={'markdown'}>
                          {val!.workingHours}
                        </Markdown>
                      </div>
                      {val?.phoneNumbers?.length === 0 ? null : (
                        <div>
                          <h4 style={{ color: 'rgba(0,0,0, 0.7)' }}>
                            Phone Numbers
                          </h4>
                          <div>
                            {val?.phoneNumbers?.map((v, key) => (
                              <Markdown className={'markdown'} key={key}>
                                {v?.phoneNumber!}
                              </Markdown>
                            ))}
                          </div>
                        </div>
                      )}
                      {val?.emails?.length === 0 ? null : (
                        <div>
                          <h4 style={{ color: 'rgba(0,0,0, 0.7)' }}>Emails</h4>
                          <div>
                            {val?.emails?.map((v, key) => (
                              <Markdown className={'markdown'} key={key}>
                                {v?.email!}
                              </Markdown>
                            ))}
                          </div>
                        </div>
                      )}
                    </Yoga>
                  </Block>
                  {val?.mapCoordinates ? (
                    <Block>
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAjYTKIXdz_UsyZC5mDX6PH4HdrI_PnMl0&q=${val?.mapCoordinates}`}
                        frameBorder={0}
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                      ></iframe>
                    </Block>
                  ) : null}
                </Card>
              ))}
            </>
          )}
        </Content>
        <Content
          className="email-block"
          style={{
            backgroundImage: `url(${branchesHero?.childImageSharp?.fluid?.src})`,
          }}
        >
          <div className={'contact-email-yoga'}>
            <Block className="email-block-left">
              <h1>Do you have a question?</h1>
              <p>
                About our products or services, or have you encountered a
                problem while using them? Feel free to reach us by the form on
                the right or using our feedback form. We will respond to your
                emailas soon as possible.
              </p>
            </Block>

            <Block className="center email-block-right">
              <EmailContact />
            </Block>
          </div>
        </Content>
      </LayoutDefault>
    </>
  )
}

export default Branches

const query = graphql`
  query BranchesStatic {
    branchesHero: file(relativePath: { eq: "about/about-hero.png" }) {
      childImageSharp {
        fluid(cropFocus: CENTER) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
