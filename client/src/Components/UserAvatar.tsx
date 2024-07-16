import Avatar from 'boring-avatars';

const UserAvatar = ({ url,size = 200}: { url: string, size?:number }) => {
  return (
    <div>
      <Avatar
        size={size}
        name= {url}
        variant="bauhaus"
        colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
      />
    </div>
  )
}

export default UserAvatar