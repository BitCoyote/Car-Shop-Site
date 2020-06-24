import React, { useMemo } from 'react'

import './bid-card.scss'

import { Bid } from '../../../../app/graphql'
import Anchor from '../../../../shared/components/anchor/anchor'
import LocationPin from '../../../../assets/icons/cil_location-pin.svg'
import { AiOutlineClockCircle, AiOutlineDownload } from 'react-icons/ai'
import Button from '../../../../shared/components/button/button'
import moment from 'moment'
import MarkdownToText from '../../../../shared/components/markdown-to-text/markdown-to-text'
import { strapiApiBase } from '../../../../../constants'

type BidCardProps = {
  bid: Pick<
    Bid,
    'id' | 'Title' | 'Location' | 'Deadline' | 'description' | 'attachment'
  >
}

const BidCard: React.FC<BidCardProps> = ({ bid }) => {
  const deadline = useMemo(() => new Date(bid.Deadline), [bid.Deadline])
  const isExpired = useMemo(() => Date.now() - deadline.getTime() > 0, [
    deadline,
  ])
  return (
    <div className={`bid-card ${isExpired ? `bid-card-expired` : ``}`}>
      <div className="bid-card-strip" />

      <div className="bid-card-content">
        <h4>
          <Anchor to={`/bid/detail/?id=${bid.id}`}>{bid.Title}</Anchor>
        </h4>
        <h5>
          <div>
            <LocationPin style={{ width: 18, height: 18 }} />
            <span> {bid.Location} </span>
          </div>
          <div>
            <AiOutlineClockCircle />
            <span>
              {isExpired ? (
                <>
                  <span className="fg-primary"> Closed </span> on
                </>
              ) : (
                <> Apply by </>
              )}{' '}
              {moment(deadline).format('MMMM d, YYYY')}
            </span>
          </div>
        </h5>
        <p>
          <MarkdownToText>{bid.description}</MarkdownToText>
        </p>
      </div>

      <div className="bid-card-actions">
        <Button to={`/bid/detail/?id=${bid.id}`} mode="lite">
          More detail
        </Button>
        {isExpired || !bid.attachment?.url ? null : (
          <Button
            to={`${strapiApiBase}${bid.attachment.url}`}
            download
            target="_blank"
            rel="noopener nofollow"
            mode="primary"
          >
            <AiOutlineDownload />
            <span>Download</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default BidCard