import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { Card, Skeleton } from 'antd'

const LoadingCard = ({ count }) => {
    const cards = () => {
        let totalCard = []
        for (let i = 0; i < count; i++) {
            totalCard.push(
                <Card className="col-md-4" key={i}>
                    <Skeleton active></Skeleton>
                </Card>
            )
        }
    }
    return <div className="row pb-3">{cards()}</div>
}

export default LoadingCard