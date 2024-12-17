import { UserInfo } from '../../types';

interface PersonalInfoProps {
  userInfo: UserInfo;
}

export default function PersonalInfo({ userInfo }: PersonalInfoProps) {
  return (
    <div>
      <h3 className="font-bold text-xl mb-2">Personal Info</h3>
      <ul className="space-y-2">
        <li>Height: {userInfo.height} cm</li>
        <li>Weight: {userInfo.weight} kg</li>
        <li>Age: {userInfo.age} years</li>
        <li>Gender: {userInfo.gender}</li>
        <li>Activity Level: {userInfo.activityLevel}</li>
      </ul>
    </div>
  );
}