import Avatar from 'boring-avatars';

const UserAvatar = ({ url }: { url: string }) => {
  return (
    <div>
      <Avatar
        size={200}
        name= {url}
        variant="bauhaus"
        colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
      />
    </div>
  )
}

export default UserAvatar