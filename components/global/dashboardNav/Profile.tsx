import Image from 'next/image';

const Profile = ({ imageUrl }: { imageUrl?: string }) => {
  return (
    <div className="h-[35px] w-[35px] cursor-pointer overflow-hidden rounded-[50%] sm:h-[50px] sm:w-[50px]">
      <Image
        src={imageUrl ? imageUrl : '/images/profile.jpeg'}
        width={50}
        height={50}
        alt="profile"
      />
    </div>
  );
};

export default Profile;
