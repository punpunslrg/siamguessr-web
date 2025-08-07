import { GoogleIcon, FacebookIcon } from "../icons/index.jsx";

function SocialLogins({ role = 'user', pageType = 'login' }) {
  const actionText = pageType === 'login' ? 'Sign in' : 'Sign in';
  const backendUrl = import.meta.env.VITE_API_BASE_URL;


  const facebookUrl = `${backendUrl}/api/auth/facebook?role=${role}`;
  const googleUrl = `${backendUrl}/api/auth/google`;

  return (
    <div className="w-full">
      <div className="divider text-sm text-gray-500 my-6">OR</div>

      <div className="space-y-3">

        <a
          href={googleUrl}
          className="btn w-full normal-case rounded-3xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
        >
          <GoogleIcon />
          {actionText} with Google
        </a>



        <a
          href={facebookUrl}
          className="btn w-full normal-case rounded-3xl"
          style={{ backgroundColor: '#1877F2', color: 'white', borderColor: '#1877F2' }}
        >
          <FacebookIcon />
          {actionText} with Facebook
        </a>
      </div>
    </div>
  );
}

export default SocialLogins;
