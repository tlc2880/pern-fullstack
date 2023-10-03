import React from 'react';
import './Skeleton.css'

type SkeletonProps = {
  classes: any
}

const Skeleton = ({ classes }: SkeletonProps) => {
    const classNames = `skeleton ${classes} animate-pulse`

    return <div className={classNames}></div>
}
export default Skeleton