import { graphql, useStaticQuery } from 'gatsby'
import { Block, Card, Content, Loading, Warning, Yoga } from 'gerami'
import Markdown from 'markdown-to-jsx'
import qs from 'qs'
import React from 'react'

import { useProductCategoriesQuery } from '../../../../../gen/apollo-types'
import { ProductCatDetailStaticQuery } from '../../../../../gen/gatsby-types'
import { usePage } from '../../../../app/contexts/page-context/page-context'
import Anchor from '../../../../shared/components/anchor/anchor'
import Button from '../../../../shared/components/button/button'
import Layout from '../../../../shared/components/layout/layout'
import { nameEachCat } from '../../../../shared/components/nameEachCat'
import { nameProductsType } from '../../../../shared/components/nameProductsType'
import Heritage from '../../components/heritage/heritage'
import './product-categories.scss'

type ProductCategoriesProps = {}

const ProductCategories: React.FC<ProductCategoriesProps> = () => {
  const { udTruck, eicher, unicarrier, macpower } = useStaticQuery<
    ProductCatDetailStaticQuery
  >(QUERY)

  const page = usePage()
  const query =
    qs.parse(page?.location.search || '?', {
      ignoreQueryPrefix: true,
    }) || {}
  const id = query.id

  const { loading, error, data } = useProductCategoriesQuery({
    variables: { where: { _q: id } },
  })

  const catagorize = [
    'PASSENGER',
    'CROSSOVER',
    'SPORT_UTILITY',
    'COMMERCIAL',
    'CRONER',
    'QUESTER',
    'NEW_QUESTER',
    'EICHER_BUS',
    'EICHER_TRUCKS',
    'MACPOWER',
    'IC_ENGINE_FORKLIFT',
    'REACH_TRUCKS_FORKLIFT',
    'LARGE_SIZE_FORKLIFT',
    'ELECTRIC_COUNTERBALANCED_FORKLIFT',
  ]

  const bgImg =
    id === 'UD_TRUCKS'
      ? udTruck
      : id === 'UNICARRIER'
      ? unicarrier
      : id === 'EICHER'
      ? eicher
      : id === 'MAC_POWER'
      ? macpower
      : null

  return (
    <>
      <Layout headerProps={{ mode: 'white' }}>
        <div
          className={'productCat-hero-container'}
          style={{
            backgroundImage: `url(${bgImg?.childImageSharp?.fluid?.src})`,
            ...(id === 'UD_TRUCKS' ? { backgroundPosition: 'bottom' } : {}),
          }}
        >
          {id === 'EICHER' || id === 'UNICARRIER' ? null : (
            <Block className="center productCat-hero-tag">
              <h1>{nameProductsType(id as any)}</h1>
            </Block>
          )}

          {id === 'EICHER' ? (
            <Block className="center productCat-hero-tag download-btn">
              <Anchor
                to={
                  'https://play.google.com/store/apps/details?id=com.eicher.app'
                }
                target={'_black'}
                className="download-app-btn"
              >
                Download the Eicher App
              </Anchor>
            </Block>
          ) : null}
        </div>
        <div>
          {!data && loading ? (
            <div>
              <Loading className="margin-vertical-very-big" delay={700} />
            </div>
          ) : !data?.products && error ? (
            <div>
              <Warning
                problem={
                  !data?.products ? `404 | DATA NOT FOUND` : (error as any)
                }
              />
            </div>
          ) : (
            <Content
              size={'4XL'}
              transparent={true}
              className="product-category-container"
            >
              <Block first last>
                <Heritage id={id as string} />
                <Block first last />
                {catagorize.map((x) => (
                  <>
                    {data?.products?.find((p) => p?.eachCategory === x) ? (
                      <>
                        <div
                          style={
                            id === 'UNICARRIER'
                              ? {
                                  backgroundColor: 'rgb(30,185,230)',
                                  height: '7px',
                                  width: '100px',
                                }
                              : {
                                  backgroundColor: '#c51632',
                                  height: '7px',
                                  width: '100px',
                                }
                          }
                        />
                        <h4 className={'product-category-title'}>
                          {nameEachCat(x)}
                        </h4>
                        <hr />
                        <Yoga maxCol={3} className="product-category-yoga">
                          {data?.products
                            ?.filter((p) => p?.eachCategory === x)
                            .map((product, key) => (
                              <Card key={key} className="product-category-card">
                                <h3>{product?.name} </h3>
                                <hr />
                                <div>
                                  <a
                                    href={`/products/detail/?id=${product!.id}`}
                                  >
                                    <img
                                      src={`${product?.headerImg?.url}`}
                                      width={'100%'}
                                    />
                                  </a>
                                </div>
                                <Markdown className="product-category-markdown">
                                  {product?.description!}
                                </Markdown>
                                <div className="center">
                                  <Button
                                    to={`/products/detail/?id=${product!.id}`}
                                    mode="lite"
                                  >
                                    More detail
                                  </Button>
                                </div>
                              </Card>
                            ))}
                        </Yoga>
                      </>
                    ) : null}
                  </>
                ))}
              </Block>
            </Content>
          )}
        </div>
      </Layout>
    </>
  )
}

export default ProductCategories

const QUERY = graphql`
  query ProductCatDetailStatic {
    eicher: file(relativePath: { eq: "products/eicher.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    udTruck: file(relativePath: { eq: "products/ud-trucks.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    unicarrier: file(relativePath: { eq: "products/unicarrier.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    macpower: file(relativePath: { eq: "products/macpower-1.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
