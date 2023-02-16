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
            <MidLengthTextSkeleton/>
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
            <ShortTextSkeleton/>
            <HeaderSkeleton/>
            <ImageSkeleton/>
            <ParagraphSkeleton/>
        </div>
    )
}
function WebsiteItemSkeleton() {
    return (
        <div className="website-item-skeleton"></div>
    )
}
function WebsiteDescriptionSkeleton() {
    return (
        <div className="website-description-skeleton">
            <HeaderSkeleton />
            <ParagraphSkeleton />
        </div>
    )
}

export {UsernameSkeleton, HeaderSkeleton, WebsiteDescriptionSkeleton, ShortTextSkeleton, MidLengthTextSkeleton, LongTextSkeleton, ParagraphSkeleton, ImageSkeleton, IssueSkeleton, ProfilePictureSkeleton, IssueItemSkeleton, WebsiteItemSkeleton}