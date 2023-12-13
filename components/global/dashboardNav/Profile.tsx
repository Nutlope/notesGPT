import Image from 'next/image';

const Profile = ({ imageUrl }: { imageUrl?: string }) => {
  return (
    <div className="h-[35px] w-[35px] sm:h-[50px] sm:w-[50px] rounded-[50%] overflow-hidden cursor-pointer">
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
