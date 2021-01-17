import Folk from 'components/folk';
import YouMissed from 'components/you-missed';
import Letters from 'components/letters';
import Layout from 'components/layout';

const missedLetters = ['B', 'D', 'E', 'Z', 'P', 'U', 'K', 'L', 'Q', 'W'];

function App() {
  return (
    <Layout>
      <Folk />
      <YouMissed missedLetters={missedLetters} />
      <Letters />
    </Layout>
  );
}

export default App;
