import { graphql, useStaticQuery } from 'gatsby'
import { Card, Loading, Warning, Yoga } from 'gerami'
import React, { useState } from 'react'

import { useProductsQuery } from '../../../../../gen/apollo-types'
import { ProductStaticQuery } from '../../../../../gen/gatsby-types'
import Button from '../../../../shared/components/button/button'
import HeroSearch from '../../../../shared/components/hero-search/hero-search'
import Layout from '../../../../shared/components/layout/layout'
import SEO from '../../../../shared/components/seo/seo'
import ProductCard from '../../components/product-card/product-card'
import './products.scss'

type ProductsProps = {}

const Products: React.FC<ProductsProps> = () => {
  const { heroBg } = useStaticQuery<ProductStaticQuery>(query)
  const nissanCategory = [
    'PASSENGER',
    'CROSSOVER',
    'SPORT_UTILITY',
    'COMMERCIAL',
  ]
  const UD_Category = ['QUESTER', 'CRONER']
  const forklift = [
    'IC_ENGINE_FORKLIFT',
    'REACH_TRUCKS_FORKLIFT',
    'LARGE_SIZE_FORKLIFT',
  ]
  const eichers = ['EICHER_BUS', 'EICHER_TRUCKS']
  const macpower = ['MACPOWER']

  const [term, setTerm] = useState('')
  const { loading, error, data } = useProductsQuery({
    variables: { where: term ? { _q: term } : {} },
  })

  return (
    <>
      <SEO
        title={'Products'}
        description={`Nyala Motors imports the Latest products from Nissan, UD trucks, Eicher, UNI Carriers and Macpower`}
        author={'Nyala Motors S.C'}
      />

      <Layout headerProps={{ mode: 'white' }}>
        <HeroSearch
          term={term}
          onTerm={setTerm}
          bg={heroBg?.childImageSharp?.fluid as any}
          color={'rgba(0, 0, 0, 0.03)'}
        />
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
            {!data?.products?.length ? (
              <div>
                No products found found
                {!term ? null : (
                  <>
                    {' '}
                    for <q> {term} </q>
                  </>
                )}
                .
              </div>
            ) : (
              <div className="product-products-content">
                <Card
                  className="product-category-card"
                  style={{ backgroundColor: 'white' }}
                >
                  <h2 className={'category-title'}>Nissan Vehicles</h2>
                  <Yoga className="product-category-yoga" maxCol={4}>
                    {nissanCategory.map((prod) => (
                      <>
                        {data.products?.find(
                          (p) => p?.eachCategory === prod
                        ) ? (
                          <ProductCard
                            product={
                              data?.products.find(
                                (p) => p?.eachCategory === prod
                              ) as any
                            }
                          />
                        ) : null}
                      </>
                    ))}
                  </Yoga>

                  {/* <div className="center">
                    <Button
                      to={'http://nissanethiopia.com/vehicles/'}
                      target="_blank"
                      mode="primary-outline"
                    >
                      Browse all Nissan vehicles
                    </Button>
                  </div> */}
                </Card>

                <Card className="product-category-card">
                  <h2 className={'category-title'}>UD Trucks</h2>
                  <Yoga className="product-category-yoga" maxCol={3}>
                    {UD_Category.map((prod) => (
                      <>
                        {data.products?.find(
                          (p) => p?.eachCategory === prod
                        ) ? (
                          <ProductCard
                            product={
                              data.products.find(
                                (p) => p?.eachCategory === prod
                              ) as any
                            }
                          />
                        ) : null}
                      </>
                    ))}
                  </Yoga>

                  <div className="center">
                    <Button
                      to={`/products/categories/?id=UD_TRUCKS`}
                      mode="primary-outline"
                    >
                      Browse all UD Trucks
                    </Button>
                  </div>
                </Card>

                <Card className="product-category-card">
                  <h2 className={'category-title'}>
                    Eicher Busses &amp; Trucks
                  </h2>
                  <Yoga className="product-category-yoga" maxCol={3}>
                    {eichers.map((prod) => (
                      <>
                        {data.products?.find(
                          (p) => p?.eachCategory === prod
                        ) ? (
                          <ProductCard
                            product={
                              data?.products.find(
                                (p) => p?.eachCategory === prod
                              ) as any
                            }
                          />
                        ) : null}
                      </>
                    ))}
                  </Yoga>

                  <div className="center">
                    <Button
                      to={`/products/categories/?id=EICHER`}
                      mode="primary-outline"
                    >
                      Browse all Echier Vehicles
                    </Button>
                  </div>
                </Card>

                <Card className="product-category-card">
                  <h2 className={'category-title'}> Unicarriers Forklift</h2>
                  <Yoga className="product-category-yoga" maxCol={3}>
                    {forklift.map((prod) => (
                      <>
                        {data.products?.find(
                          (p) => p?.eachCategory === prod
                        ) ? (
                          <ProductCard
                            product={
                              data?.products.find(
                                (p) => p?.eachCategory === prod
                              ) as any
                            }
                          />
                        ) : null}
                      </>
                    ))}
                  </Yoga>

                  <div className="center">
                    <Button
                      to={`/products/categories/?id=UNICARRIER`}
                      mode="primary-outline"
                    >
                      Browse all Unicarriers
                    </Button>
                  </div>
                </Card>

                <Card className="product-category-card">
                  <h2 className={'category-title'}>Macpower Batteries</h2>
                  <Yoga className="product-category-yoga" maxCol={3}>
                    {macpower.map((prod) => (
                      <>
                        {data.products?.find(
                          (p) => p?.eachCategory === prod
                        ) ? (
                          <ProductCard
                            product={
                              data?.products.find(
                                (p) => p?.eachCategory === prod
                              ) as any
                            }
                          />
                        ) : null}
                      </>
                    ))}
                  </Yoga>

                  <div className="center">
                    <Button
                      to={`/products/categories/?id=MAC_POWER`}
                      mode="primary-outline"
                    >
                      Macpower Battery
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </>
        )}
      </Layout>
    </>
  )
}

export default Products

const query = graphql`
  query ProductStatic {
    heroBg: file(relativePath: { eq: "hero/product-hero.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1680, cropFocus: NORTH) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
