import './Skeleton.css'

function UsernameSkeleton() {
    return (
        <p className="username-skeleton"></p>
    )
}
function HeaderSkeleton() {
    return (
        <div className="header-skeleton"></div>
    )
}
function ProfilePictureSkeleton() {
    return (
        <div className="profile-picture-skeleton"></div>
    )
}
function IssueItemSkeleton() {
    return (
        <div className="issue-item-skeleton"></div>
    )
}
function ShortTextSkeleton() {
    return (
        <div className='short-text-skeleton'></div>
    )
}
function MidLengthTextSkeleton() {
    return (
        <div className='mid-length-text-skeleton'></div>
    )
}
function LongTextSkeleton() {
return (
    <div className='long-text-skeleton'></div>
)
}
function ParagraphSkeleton() {
    return (
        <div className="paragraph-skeleton">
            <MidLengthTextSkeleton/>
            <ShortTextSkeleton/>
            <LongTextSkeleton/>
        </div>
    )
}

function ImageSkeleton() {
    return (
        <div className="image-skeleton"></div>
    )
}

function IssueSkeleton() {
    return (
        <div className="issue-skeleton">
            <HeaderSkeleton/>
            <ImageSkeleton/>
            <ParagraphSkeleton/>
        </div>
    )
}

export {UsernameSkeleton, HeaderSkeleton, ShortTextSkeleton, MidLengthTextSkeleton, LongTextSkeleton, ParagraphSkeleton, ImageSkeleton, IssueSkeleton, ProfilePictureSkeleton, IssueItemSkeleton}